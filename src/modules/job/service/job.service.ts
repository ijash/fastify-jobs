import axios from "axios";

interface IJobServiceFilter {
  description?: string;
  location?: string;
  full_time?: boolean;
}

interface IJobServicePagination {
  page?: number;
  limit?: number;
}

interface IJob {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
}

class UserService {
  async find(filter: IJobServiceFilter, pagination: IJobServicePagination) {
    const { page = 1, limit = 10 } = pagination;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const response = await axios.get(
      "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"
    );

    if (response.status === 200) {
      const jobs: IJob[] = response.data;
      const { page = 1, limit = 10 } = pagination;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const filtered = jobs.filter((job: IJob, index: number) => {
        // Convert filter values to lowercase
        const filterDescription = filter.description?.toLowerCase();
        const filterLocation = filter.location?.toLowerCase();

        // Convert job property values to lowercase
        const jobDescription = job.description.toLowerCase();
        const jobLocation = job.location.toLowerCase();
        const jobType = job.type.toLowerCase();

        // Apply filters based on the provided criteria
        if (filterDescription && !jobDescription.includes(filterDescription)) {
          return false;
        }
        if (filterLocation && !jobLocation.includes(filterLocation)) {
          return false;
        }
        if (filter.full_time && !jobType.includes("full time")) {
          return false;
        }

        // Apply pagination
        if (index < startIndex || index >= endIndex) {
          return false;
        }

        return true;
      });

      return {
        page,
        limit,
        totalResults: filtered.length,
        results: filtered,
      };
    } else {
      return undefined;
    }

    // return await UserRepository.find(filter);
  }
  async findOne(id: string) {
    try {
      const response = await axios.get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    }

    return undefined;
  }
}

export default new UserService();

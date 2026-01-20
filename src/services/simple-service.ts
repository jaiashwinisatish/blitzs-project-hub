import { simpleDevelopers, simpleProjects } from './simple-data';

export const simpleService = {
  getAllDevelopers: async () => {
    console.log('Using simple fallback data for developers');
    return {
      success: true,
      data: {
        developers: simpleDevelopers
      }
    };
  },

  getAllProjects: async (options?: any) => {
    console.log('Using simple fallback data for projects', options);
    return {
      success: true,
      data: {
        projects: simpleProjects,
        pagination: {
          currentPage: options?.page || 1,
          totalPages: 1,
          totalProjects: simpleProjects.length
        }
      }
    };
  },

  addDeveloper: async (developerData: any) => {
    return {
      success: true,
      data: {
        _id: Date.now().toString(),
        ...developerData,
        isActive: true
      }
    };
  },

  updateDeveloper: async (id: string, developerData: any) => {
    return {
      success: true,
      data: {
        _id: id,
        ...developerData
      }
    };
  },

  deleteDeveloper: async (id: string) => {
    return {
      success: true,
      message: 'Developer deleted successfully'
    };
  },

  purchaseProject: async (projectId: string) => {
    return {
      success: true,
      message: 'Project purchased successfully!',
      data: {
        isFree: true
      }
    };
  }
};

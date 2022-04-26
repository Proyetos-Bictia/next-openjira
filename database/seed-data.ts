interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  createdAt: number;
  description: string;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      createdAt: Date.now(),
      description: 'pending: lorem ipsu asdada hola',
      status: 'pending'
    },
    {
      createdAt: Date.now() - 1000000,
      description: 'in-progress: lorem ipsu asdada hola',
      status: 'in-progress'
    },
    {
      createdAt: Date.now() - 100000,
      description: 'finished: lorem ipsu asdada hola',
      status: 'finished'
    }
  ]
}
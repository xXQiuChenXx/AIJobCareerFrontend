export type InnovationHub = {
  imageUrl?: string;
  division: string;
  address: string;
  mapUrl: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
};

export type University = {
  name: string
  shortName: string
  location: string
  description: string
  foundedYear: number
  studentCount: string
  ranking: string
  notablePrograms: string[]
  website: string
  imageUrl: string
}

export type LearningPlatform = {
  name: string
  description: string
  imageUrl: string
  url: string
}
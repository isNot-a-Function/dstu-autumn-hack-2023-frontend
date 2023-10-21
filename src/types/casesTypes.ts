export interface specialization {
  id: string;
  title: string;
  topLevelTitle: string;
}

export interface getSpecializationsData {
  message: string;
  specializations: specialization[];
}

export interface getOrdersData {
  cost: number;
  costType: string;
  createdAt: string;
  customer: { id: string; userId: string; rating: number };
  customerId: string;
  description: string;
  files: string[];
  id: string;
  responsesCount: number;
  specialization: { id: string; title: string; topLevelTitle: string };
  specializationId: string;
  status: string;
  tags: string[];
  title: string;
  updatedAt: string;
  views: number;
}
export interface getOrderData {
  order: {
    id: string;
    createdAt: string;
    updatedAt: string;
    customerId: string;
    status: string;
    title: string;
    description: string;
    files: any;
    tags: string[];
    views: number;
    costType: string;
    cost: number;
    responses?: responseItem[];
    responsesCount: number;
    specializationId: string;
    customer: {
      id: string;
      userId: string;
      rating: number;
      family: string | null;
      name: string | null;
    };
    executorId: null | string;
    executor: {
      classification: null | string;
      cost: null | number;
      costType: string;
      description: null | string;
      expirience: string;
      id: string;
      rating: number;
      tags: string[];
      userId: string;

      user: {
        name?: string;
        family?: string;
      };
    };
    specialization: {
      id: string;
      title: string;
      topLevelTitle: string;
    };
  };
  user: {
    id: string;
    email: string;
    passwordHash: string;
    role: string;
    name: string;
    family: string;
    dateOfBirth: string;
    city: string;
    logo: string;
    contact: string;
    custoremInfo: {
      id: string;
      userId: string;
      rating: 4.7;
    };
  };
  response: boolean;
  status: boolean;
  responses: responseItem[];
}

export interface createResponseProps {
  orderId: string;
  comment: string;
}
export interface archiveOrder {
  orderId: string;
}

export interface responseItem {
  id: string;
  createdAt: string;
  orderId: string;
  executorId: string;
  comment: string;
  cost?: number;
  costType?: string;
  name?: string;
  family?: string;
  rating?: number;
  executor: {
    id: string;
    userId: string;
    rating: number;
    ratingCount: number;
    description: null | String;
    classification: null | string;
    tags: string[];
    expirience: string;
    costType: string;
    cost: string;
    user: {
      family: string | null;
      name: string | null;
    };
  };
}

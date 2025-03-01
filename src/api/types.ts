export interface SignupResponse {
    id:                   string;
    full_name:            string;
    email:                string;
    role:                 string;
    resetPasswordExpires: null;
}

export interface LoginResponse {
    accessToken:  string;
    refreshToken: string;
}

export interface GetUserDetailsResponse {
    id:                   string;
    full_name:            string;
    email:                string;
    role:                 string;
    resetPasswordExpires: null;
    medicalHistories:     any[];
    insurance:            null;
    contacts:             any[];
    notifications:        any[];
    documents:            any[];
}

export interface GetInsuranceResponse {
    id:                   string;
    user:                 User;
    provider:             string;
    planName:             string;
    memberId:             string;
    groupNumber:          string;
    policyHolderName:     string;
    policyHolderRelation: string;
    isActive:             boolean;
    startDate:            Date;
    endDate:              Date;
    customerServicePhone: string;
    frontCardImage:       string;
    backCardImage:        string;
    createdAt:            Date;
}

export interface User {
    id:                   string;
    full_name:            string;
    email:                string;
    role:                 string;
    resetPasswordExpires: null;
}


export interface SendMessageResponse {
    sessionId: string;
    response:  string;
}


export type GetChatHistoryResponse= Chat[]

export interface Chat {
    role:    "user"|"assistant";
    content: string;
}

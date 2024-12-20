export type JobItem = {
    id : number;
    badgeLetters : string;
    title : string;
    company : string;
    date : string;
    relevanceScore : number;
    daysAgo : number;
}

export type extendedJobItem = JobItem & {
    description : string;
    qualifications : string[];
    reviews : string [];
    duration : string;
    location : string;
    salary  : string;
    coverImgURL : string;
    companyURL : string
}

export type JobItemApiResponse = {
    public : boolean;
    jobItem : extendedJobItem;
}

export  type JobItemsApiResponse =  {
    public : boolean;
    sorted : boolean;
    jobItems : JobItem[];
}

export type sortBy = 'recent'|'relevant' ;

export type direction = 'next' | 'previous';
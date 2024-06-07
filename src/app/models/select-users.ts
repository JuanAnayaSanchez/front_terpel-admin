export interface DataSelectUsers {
    data: UserData[];
}

export interface UserData {
    id:                    number;
    name:                  string;
    mail:                  string;
    phone:                 string;
    city:                  string;
    identification_number: number;
    date:                  Date;
    total_points:          string;
}


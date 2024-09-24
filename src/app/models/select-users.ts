export interface DataSelectUsers {
    data: UserData[];
}

export interface UserData {
    id:                    number;
    name:                  string;
    mail:                  string;
    phone:                 string;
    cityName:                  string;
    identification_number: number;
    date:                  Date;
    total_points:          string;
}


export interface UserGroupData {
    id: number
    name: string
    mail: string
    phone: string
    identification_number: number
    date: string
    cityName: string
    documentType: string
    total_points: string
    type: number
  }


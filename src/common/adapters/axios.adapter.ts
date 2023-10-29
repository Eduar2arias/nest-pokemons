import axios, { AxiosInstance } from "axios";
import { httpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

// con esto se puede inyectar en el constructor
@Injectable()
export class AxiosAdapter  implements httpAdapter{

    private axios: AxiosInstance = axios
    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get(url)
            return data
        } catch (error) {
            throw new Error( 'this  is an error - check logs' )
        } 
    }
}
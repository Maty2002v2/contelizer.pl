import { ref } from 'vue';
import urlJoin from 'url-join';
import type { User, UserApi } from '../types';
import mockData from '../mockGorestApiData.json'

const url = 'https://gorest.co.in';
const usersEndpoint = '/public/v2/users';

const isError = ref<boolean>(false);

const users = ref<UserApi[]>([]);

const getUsers = async () => {
    isError.value = false;

    try {
        const response = await fetch(urlJoin(url, usersEndpoint), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
            },
        })
    
        const data = await response.json() as UserApi[];

        users.value = data;
    } catch (error) {
        isError.value = true;

        //mock data, api nie działało w nocy
        users.value = mockData;
    }

}

const editUser = async (userData: User): Promise<void> => {
    isError.value = false;
    
    const copy = JSON.parse(JSON.stringify(userData)); 
    if ('id' in copy) delete copy.id;

    try {
        await fetch(`${urlJoin(url, usersEndpoint)}/${userData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
            },
            body: JSON.stringify(copy)
        });
    
        await getUsers();
    } catch (error) {
        isError.value = true;
    }
}

export function useServiceApi() {
    return {
        users,
        getUsers,
        editUser,
        isErrorGorestApi: isError
    }
}

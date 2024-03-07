import React, {useEffect} from 'react'


export default function Database() {

    useEffect(() => {
        const fetchData = async () => {
          try {
            const raw_response = await axios.get(`/api/ecs`);
            let response = raw_response.data;
            response = Object.values(response).filter(
              (value: any) => formatRelativeTime(value.deadline, true) != false
            );
            // response = response.map(oppToUser)
            // console.log(response.length)
            setEcItems(response);
            setSearchDataFiltered(response);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };
    
        fetchData();
      }, []);

    return (
        
    )
}
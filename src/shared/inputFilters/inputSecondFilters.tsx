import { Select } from "antd";
import { regions, okved } from ".";
import { RegionType, ConvertedRegionType, OkvedType, ConvertedOkved, ConvertedOkvedType } from ".";
import useStore from "../../store/useStore";
import {Form} from "antd";
// import { useInput } from "../../store";



function convertRegion(regions: RegionType[]) {
    const convertedRegions = regions.map((region) => {
        const convertedRegion = {label: region.name, value: region.name, id: region.id}
        return convertedRegion;
    })
    return convertedRegions;
}

function convertOkved(okved : OkvedType[]) : ConvertedOkvedType[] {
    const convertedOkved = okved.map((okv) => {
        const convertedOkv : ConvertedOkvedType = {
            label: okv.Name,
            id: okv.global_id,
            value: okv.Name
        }

        return convertedOkv;
    })
    return convertedOkved;
}

const InputSecondFilters = () => {
    const setRegions = useStore((state) => state.setSecondRegions);
    const setActivities = useStore((state) => state.setSecondActivities);
    const activities = useStore(state => state.secondActivities)

    const secondFilters = useStore((state) => state.secondFilters)
    const isPerson = secondFilters.includes('People');
    const isCompany = secondFilters.includes('Company');    

    const regionsOption = convertRegion(regions)
    const okvedOptions = convertOkved(okved)

    const handleChangeRegions = (selectedRegions: string[]) => {
        const updatedRegions = selectedRegions.map((region) => {
            const id = regionsOption.find((opt) => opt.label === region)?.id
            const convertedRegion : ConvertedRegionType = {
                id: Number(id),
                label: region,
                value: region
            }

            return convertedRegion;
        });

        setRegions(updatedRegions) 
    };

    const handleChangeActivity = (selectedActivities: string[]) =>{
        const updatedActivities = selectedActivities.map((activity) => {
            const id = okvedOptions.find((opt) => opt.label === activity)?.id
            const convertedActivity : ConvertedOkvedType = {
                id: Number(id),
                label: activity,
                value: activity
            }

            return convertedActivity;
        });

        setActivities(updatedActivities);
    };

    const handleDeselect = () => {
        setActivities([])
        setRegions([])
    }

   return (
    <>
        <div style={{minHeight: '115px'}}>
            { 
            <Form.Item>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Выберите регион"
                    onChange={handleChangeRegions}                
                    options={regionsOption}
                    onDeselect={handleDeselect}                >
                </Select>
            </Form.Item>
            }
            {isCompany && <Form.Item>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Выберите вид деятельности"
                    onChange={handleChangeActivity}        
                    options={okvedOptions}
                    onDeselect={handleDeselect}>
                </Select>
            </Form.Item>}
        </div>
        
    
    </>
   );
};
export {InputSecondFilters};

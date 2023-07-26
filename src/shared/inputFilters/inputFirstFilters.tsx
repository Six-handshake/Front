import { Select } from "antd";
import { regions, RegionType, ConvertedRegionType, okved, OkvedType, ConvertedOkvedType } from ".";
import useStore from "../../store/useStore";
import {Form} from "antd";

function convertRegion(regions: RegionType[]) : ConvertedRegionType[] {
    
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

const InputFirstFilters = () => {
    const setRegions = useStore((state) => state.setFirstRegions);
    const setActivities = useStore((state) => state.setFirstActivities)

    const firstFilters = useStore((state) => state.firstFilters);
    const isPerson = firstFilters.includes('People');
    const isCompany = firstFilters.includes('Company');

    const options = convertRegion(regions)
    const okvedOptions = convertOkved(okved)

    const handleChange = (selectedRegions: string[]) => {
        const updatedRegions = selectedRegions.map((region) => {
            const id = options.find((opt) => opt.label === region)?.id
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
            {<Form.Item>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Выберите регион"
                    onChange={handleChange}
                    options={options}
                    onDeselect={handleDeselect}
                >
                </Select>
            </Form.Item>}
            {isCompany && <Form.Item>
                <Select
                    style={{width: '100%'}}
                    mode="multiple"
                    allowClear
                    placeholder="Выберите вид деятельности"
                    onChange={handleChangeActivity}        
                    options={okvedOptions}
                    onDeselect={handleDeselect}
                    >
                </Select>
            </Form.Item>}

        </div>
        
    </>
    
   );
};
export {InputFirstFilters};

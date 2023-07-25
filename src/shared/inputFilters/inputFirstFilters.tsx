import { Select } from "antd";
import {
    regions,
    RegionType,
    ConvertedRegionType,
    okved,
    OkvedType,
    ConvertedOkvedType,
} from ".";
import useStore from "../../store/useStore";

function convertRegion(regions: RegionType[]): ConvertedRegionType[] {
    const convertedRegions = regions.map((region) => {
        const convertedRegion = {
            label: region.name,
            value: region.name,
            id: region.id,
        };
        return convertedRegion;
    });
    return convertedRegions;
}

function convertOkved(okved: OkvedType[]): ConvertedOkvedType[] {
    const convertedOkved = okved.map((okv) => {
        const convertedOkv: ConvertedOkvedType = {
            label: okv.Name,
            id: okv.global_id,
            value: okv.Name,
        };

        return convertedOkv;
    });
    return convertedOkved;
}

const InputFirstFilters = () => {
    const setRegions = useStore((state) => state.setFirstRegions);
    const setActivities = useStore((state) => state.setFirstActivities);

    const firstFilters = useStore((state) => state.firstFilters);
    const isPerson = firstFilters.includes("People");

    const options = convertRegion(regions);
    const okvedOptions = convertOkved(okved);

    const handleChange = (selectedRegions: string[]) => {
        const updatedRegions = selectedRegions.map((region) => {
            const id = options.find((opt) => opt.label === region)?.id;
            const convertedRegion: ConvertedRegionType = {
                id: Number(id),
                label: region,
                value: region,
            };

            return convertedRegion;
        });

        setRegions(updatedRegions);
    };

    const handleChangeActivity = (selectedActivities: string[]) => {
        const updatedActivities = selectedActivities.map((activity) => {
            const id = okvedOptions.find((opt) => opt.label === activity)?.id;
            const convertedActivity: ConvertedOkvedType = {
                id: Number(id),
                label: activity,
                value: activity,
            };

            return convertedActivity;
        });

        setActivities(updatedActivities);
    };

    return (
        <div className="flex flex-col gap-2">
            {!isPerson && (
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Выберите регион"
                    onChange={handleChange}
                    options={options}
                ></Select>
            )}
            <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Выберите вид деятельности"
                onChange={handleChangeActivity}
                options={okvedOptions}
            ></Select>
        </div>
    );
};
export { InputFirstFilters };

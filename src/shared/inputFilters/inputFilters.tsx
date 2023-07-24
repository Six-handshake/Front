import { Select } from "antd";
import { regions } from ".";
import { RegionType } from ".";
import { useEffect } from "react";

const options = convertRegion(regions)

function convertRegion(regions: RegionType[]) {
    const convertedRegions = regions.map((region) => {
        const convertedRegion = {label: region.name, value: region.name, id: region.id}
        return convertedRegion;
    })
    return convertedRegions;
}

const InputFilters = () => {
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

   return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Выберите регион"
      onChange={handleChange}
      options={options}
    >

    </Select>
   );
};
export {InputFilters} ;
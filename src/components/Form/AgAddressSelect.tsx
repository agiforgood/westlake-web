import { useState, useEffect } from "react";

import { Select, SelectItem } from "@heroui/react";

import pca from "@/lib/pca.json";

export default function AgAddressSelect({
  defaultValue,
}: {
  defaultValue?: string[];
}) {
  const [province, setProvince] = useState<string | undefined>(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [district, setDistrict] = useState<string | undefined>(undefined);
  const [provinceList] = useState<{ key: string; label: string }[]>(
    pca.map((object) => ({ key: object.name, label: object.name }))
  );
  const [cityList, setCityList] = useState<{ key: string; label: string }[]>(
    []
  );
  const [districtList, setDistrictList] = useState<
    { key: string; label: string }[]
  >([]);

  useEffect(() => {
    if (!defaultValue || defaultValue.length < 2) return;

    // 1. 省
    const provinceName = defaultValue[0];
    const cityName = defaultValue[1];
    const districtName = defaultValue[2];

    const provinceObj = pca.find((p) => p.name === provinceName);
    if (!provinceObj) return;

    // 2. 城市列表
    const cities = provinceObj.children.map((c) => ({
      key: c.name,
      label: c.name,
    }));
    setProvince(provinceName);
    setCityList(cities);

    // 3. 当前城市对象
    const cityObj = provinceObj.children.find((c) => c.name === cityName);
    if (!cityObj) return;

    // 4. 区县列表
    const districts = cityObj.children.map((d) => ({
      key: d.name,
      label: d.name,
    }));
    setCity(cityName);
    setDistrictList(districts);

    // 5. 区县
    if (districtName) {
      setDistrict(districtName);
    }
  }, [defaultValue]);

  const handleProvinceChange = (province: string | undefined) => {
    if (!province) return;
    const provinceObj = pca.find((object) => object.name === province);
    if (!provinceObj) return;
    setCityList(
      provinceObj.children.map((object) => ({
        key: object.name,
        label: object.name,
      }))
    );
    setProvince(province);
    // 清空城市和区县的选择
    setCity(undefined);
    setDistrict(undefined);
    setDistrictList([]);
  };

  const handleCityChange = (city: string | undefined) => {
    if (!city) return;
    if (province) {
      const provinceObj = pca.find((object) => object.name === province);
      if (!provinceObj) return;
      const cityObj = provinceObj.children.find(
        (object) => object.name === city
      );
      if (!cityObj) return;
      setDistrictList(
        cityObj.children.map((object) => ({
          key: object.name,
          label: object.name,
        }))
      );
      setCity(city);
      // 清空区县的选择
      setDistrict(undefined);
    }
  };

  return (
    <div className="w-full">
      <div className="text-sm mb-2">当前地址</div>
      <div className="grid grid-cols-3 w-full gap-4">
        <Select
          className="col-span-1"
          label="省份"
          items={provinceList}
          labelPlacement="inside"
          radius="md"
          name="province"
          selectedKeys={province ? [province] : []}
          onSelectionChange={(e) => {
            const province = e.currentKey;
            handleProvinceChange(province);
          }}
        >
          {(province) => (
            <SelectItem key={province.key}>{province.label}</SelectItem>
          )}
        </Select>
        <Select
          className="col-span-1"
          label="城市"
          items={cityList}
          labelPlacement="inside"
          name="city"
          selectedKeys={city ? [city] : []}
          onSelectionChange={(e) => {
            const city = e.currentKey;
            handleCityChange(city);
          }}
        >
          {(city) => <SelectItem key={city.key}>{city.label}</SelectItem>}
        </Select>
        <Select
          className="col-span-1"
          label="区县"
          items={districtList}
          labelPlacement="inside"
          name="district"
          selectedKeys={district ? [district] : []}
          onSelectionChange={(e) => {
            const district = e.currentKey;
            if (district) {
              setDistrict(district);
            }
          }}
        >
          {(district) => (
            <SelectItem key={district.key}>{district.label}</SelectItem>
          )}
        </Select>
      </div>
    </div>
  );
}

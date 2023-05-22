import { useEffect, useState } from "react";
import useFetchingApi from "./useFetchingApi";
import { funcKey } from "@/common/ConfigSelectOption";

const useFethingOptionApi = ({
  isSearching = false,
  keySearching = "name",
  isOptionAll = false,
  customOptionAll = () => {},
  customFucKey = funcKey,
  keyUnine = "value",
  nameTable,
  CallAPi,
  limit = LIMIT_SELECT,
  retry = 1,
  customUrlOption = () => {},
}) => {
  const [search, setSearch] = useState("");
  const [option, setOption] = useState([]);

  const { data, ...rest } = useFetchingApi({
    nameTable,
    CallAPi,
    limit,
    retry,
    customUrl: ({ query, nameTable, limit, page, ...rest }) => {
      let url =
        customUrlOption({ query, nameTable, limit, page, ...rest }) ||
        query.for(nameTable).per_page(limit).page(page);

      if (isSearching && search) {
        if ((isOptionAll && search !== -1) || !isOptionAll) {
          url = url.where(keySearching, search);
        }
      }

      return url.url();
    },
  });

  useEffect(() => {
    if (data?.data) {
      let result = isOptionAll
        ? customOptionAll({ optionAddAll, data: data?.data }) ||
          optionAddAll(data?.data)
        : [...data?.data];

      setOption((prev) => {
        return unineArrayOption(keyUnine, prev, customFucKey(result));
      });
    }
  }, [data]);

  return { data, search, setSearch, option, setOption, ...rest };
};

export default useFethingOptionApi;

import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUsers } from "../../store/userSlice";
import { UserCard } from "../../components/Users/UserCard";
import { useState } from "react";
import { PagePagination } from "../../components/Pagination";

const Users = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({
      skip: (page - 1) * limit,
      limit
    }));
  }, [page]);

  const { t } = useTranslation();

  return (
      <>
        {loading && <p>{t("users.loading")}</p>}

        {error && <p>{error}</p>}

        {users.map((user) => (
            <UserCard
                key={user.id}
                user={user}
            />
        ))}

        <PagePagination
          page={page}
          totalPages={10}
          onChange={setPage}
        />
      </>
  );
};

export { Users };

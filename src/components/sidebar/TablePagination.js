import { useDispatch, useSelector } from "react-redux";

import {
  selectTotalPages,
  selectNextPage,
  selectPeviousPage,
} from "../../store/characters/selectors";
import {
  fetchFilteredCharacters,
  changePage,
} from "../../store/characters/actions";
import { Button } from "reactstrap";

const TablePagination = ({ setSortOrder, setSortedCharacters }) => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const previousPage = useSelector(selectPeviousPage);
  const nextPage = useSelector(selectNextPage);

  const onClick = (e, type) => {
    e.preventDefault();

    setSortedCharacters([]);
    setSortOrder("asc");

    if (type === "first") {
      dispatch(fetchFilteredCharacters({ page: 1 }, "pagination"));
    } else if (type === "previous") {
      dispatch(changePage(previousPage));
    } else if (type === "next") {
      dispatch(changePage(nextPage));
    } else {
      dispatch(fetchFilteredCharacters({ page: totalPages }, "pagination"));
    }
  };

  return (
    <div className="pagination">
      <Button
        disabled={!previousPage}
        className="page-item"
        onClick={(e) => onClick(e, "first")}
      >
        First Page
      </Button>
      <Button
        disabled={!previousPage}
        className="page-item"
        onClick={(e) => onClick(e, "previous")}
      >
        Previous
      </Button>
      <Button
        disabled={!nextPage}
        className="page-item"
        onClick={(e) => onClick(e, "next")}
      >
        Next
      </Button>
      <Button
        disabled={!nextPage}
        className="page-item"
        onClick={(e) => onClick(e, "last")}
      >
        Last Page
      </Button>
    </div>
  );
};

export default TablePagination;

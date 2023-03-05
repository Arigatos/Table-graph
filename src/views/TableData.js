import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../components/sidebar/PageTitle";
import { columnsHeader } from "./helper";

import {
  fetchCharacters,
  fetchFilteredCharacters,
} from "../store/characters/actions";
import {
  selectCharacters,
  selectIsLoading,
} from "../store/characters/selectors";

import arrowDown from "../assets/images/arrow-down.png";
import TextWithTooltip from "../components/sidebar/TextWithTooltip";
import Search from "../components/sidebar/Search";
import InfoModal from "../components/sidebar/InfoModal";
import TablePagination from "../components/sidebar/TablePagination";
import Loader from "../components/Loader";

const TableData = () => {
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectIsLoading);

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedCharacters, setSortedCharacters] = useState([]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && searchTerm) {
      try {
        await dispatch(
          fetchFilteredCharacters({ name: searchTerm.toLowerCase() }, "search")
        );
      } catch (e) {
        console.error(e);
      }
    } else if (event.key === "Enter" && !searchTerm) {
      dispatch(fetchCharacters());
    }
  };

  const handleSort = () => {
    if (sortOrder === "asc") {
      const sorted = [...characters].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setSortedCharacters(sorted);
      setSortOrder("desc");
    } else {
      const sorted = [...characters].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setSortedCharacters(sorted);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const charactersToRender =
    sortedCharacters.length > 0 ? sortedCharacters : characters;

  return (
    <div className="table-page">
      <PageTitle title="Table Data Page" />

      <Search
        onChange={(value) => setSearchTerm(value)}
        handleKeyDown={handleKeyDown}
        searchTerm={searchTerm}
      />

      {!isLoading ? (
        <>
          <div className="characters-table">
            <div className="table-page__header">
              {columnsHeader.map((col, i) => {
                return (
                  <div className="table-page__header--col" key={i}>
                    {col.header}
                    {col.sort ? (
                      <button onClick={handleSort}>
                        <img
                          src={arrowDown}
                          className={`${sortOrder === "desc" ? "active" : ""}`}
                          alt="arrowDown"
                          width="16px"
                          height="16px"
                        />
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div>
              {charactersToRender?.map((character, i) => {
                const tvShows = character.tvShows?.map((t) => t).join(", ");
                const videoGames = character.videoGames
                  ?.map((v) => v)
                  .join(", ");
                const alies = character.allies?.map((a) => a).join(", ");
                const enemies = character.enemies?.map((e) => e).join(", ");

                return (
                  <div
                    key={i}
                    className="table-page__body"
                    onClick={() => {
                      setActive(character);
                      setIsOpen(!isOpen);
                    }}
                  >
                    <div className="table-page__body--col">
                      {character?.name}
                    </div>
                    <div className="table-page__body--col">
                      {tvShows ? (
                        <TextWithTooltip maxChars={30} text={tvShows || "-"} />
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="table-page__body--col">
                      {videoGames ? (
                        <TextWithTooltip
                          maxChars={30}
                          text={videoGames || "-"}
                        />
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="table-page__body--col">
                      {alies ? (
                        <TextWithTooltip maxChars={30} text={alies || "-"} />
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="table-page__body--col">
                      {enemies ? (
                        <TextWithTooltip maxChars={30} text={enemies || "-"} />
                      ) : (
                        "-"
                      )}{" "}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <TablePagination
            setSortOrder={setSortOrder}
            setSortedCharacters={setSortedCharacters}
          />
        </>
      ) : (
        <Loader />
      )}

      <InfoModal
        active={active}
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default TableData;

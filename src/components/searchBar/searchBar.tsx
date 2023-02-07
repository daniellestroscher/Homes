/** @jsxImportSource theme-ui */

type Props = {
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
};
export default function searchBar({ searchQuery, setSearchQuery }: Props) {
  return (
    <div
      sx={{
        position: "fixed",
        top: '77px',
        zIndex: "1",
        backgroundColor: "accentLightest",
        padding: "5px",
        width: "100vw",
        margin: "0px 5px",
        borderRadius: '6px',
      }}
    >
      <form sx={{ marginLeft: "10px", padding: "5px" }}>
        <label htmlFor="header-search">
          <span sx={{ variant: "containers.visuallyHidden" }}>
            Search Units
          </span>
        </label>
        <input
          sx={{ padding: "5px", width: "275px" }}
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          type="text"
          id="header-search"
          placeholder="Search Units"
        />
      </form>
    </div>
  );
}

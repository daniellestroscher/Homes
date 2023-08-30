/** @jsxImportSource theme-ui */
import { ITenancy, IUnit } from "../../types/interfaces";

type Props = {
  unit: IUnit;
  tenancyArr: ITenancy[];
};
export function UnitHistory({ unit, tenancyArr }: Props) {
  console.log(unit, tenancyArr);
  let historicTenancies = tenancyArr.filter((tenancies) => {
    return (
      new Date(tenancies.establishedDate).getTime() <= new Date().getTime() &&
      tenancies.activeStatus === false
    );
  });
  //Current
  let currentTenancy = tenancyArr.find((one) => one.activeStatus === true);
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };
  let currentEstablishedDate = new Date(
    currentTenancy?.establishedDate as string
  )
    .toUTCString()
    .slice(0, 16);

  return (
    <div sx={{ display: "flex", justifyContent: "center" }}>
      <section sx={{ variant: "containers.singlePageFormCont" }}>
        <div
          sx={{
            position: "absolute",
            top: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 sx={{ alignSelf: "center" }}>
            History for Unit No. {unit.number}
          </h3>
          <div
            sx={{
              alignSelf: "center",
              height: "0px",
              width: "65vw",
              border: "1px solid gray",
              margin: "15px",
            }}
          ></div>
          <section
            sx={{
              overflowY: "scroll",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <div>
              {historicTenancies &&
                historicTenancies.map((tenancy) => {
                  let date = new Date(tenancy.establishedDate)
                    .toUTCString()
                    .slice(0, 16);
                  return (
                    <>
                      <h5
                        sx={{
                          backgroundColor: "accentLight",
                          width: "150px",
                          padding: "10px",
                          marginTop: "25px",
                          borderRadius: "5px",
                          color: "white",
                        }}
                      >
                        {date}
                      </h5>
                      {tenancy &&
                        tenancy.tenants &&
                        tenancy.tenants[0] &&
                        tenancy.tenancy_versions &&
                        tenancy.tenancy_versions[0] && (
                          <>
                            <div
                              sx={{
                                border: "2px solid gray",
                                padding: "20px",
                                borderRadius: "5px",
                                margin: "0px 35px",
                              }}
                            >
                              {`The tenancy, of ${tenancy?.tenants[0].firstName} ${tenancy?.tenants[0].lastName} `}
                              <span>
                                {tenancy.tenants[1]
                                  ? `& ${tenancy.tenants[1].firstName} ${tenancy.tenants[1].lastName}`
                                  : ""}
                              </span>
                              {` was established for ${tenancy.tenancy_versions[0].rent}`}
                            </div>
                            <div>
                              {tenancy.tenancy_versions &&
                                tenancy.tenancy_versions.length > 1 &&
                                tenancy.tenancy_versions.map((ten) => {
                                  let date = new Date(
                                    ten.recordEffectiveDate as string
                                  )
                                    .toUTCString()
                                    .slice(0, 16);
                                  return (
                                    <>
                                      <h5
                                        sx={{
                                          backgroundColor: "accentLight",
                                          width: "150px",
                                          padding: "10px",
                                          marginTop: "15px",
                                          borderRadius: "5px",
                                          color: "white",
                                        }}
                                      >
                                        {date}
                                      </h5>
                                      <div
                                        sx={{
                                          border: "2px solid gray",
                                          padding: "20px",
                                          borderRadius: "5px",
                                          margin: "0px 35px",
                                        }}
                                      >
                                        {`rent was increased to ${ten.rent}`}
                                      </div>
                                    </>
                                  );
                                })}
                            </div>
                          </>
                        )}
                    </>
                  );
                })}
            </div>
            {currentTenancy &&
              currentTenancy.tenants &&
              currentTenancy.tenants[0] && (
                <>
                  <h5
                    sx={{
                      backgroundColor: "accentLight",
                      width: "150px",
                      padding: "10px",
                      marginTop: "25px",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    {currentEstablishedDate}
                  </h5>
                  <div
                    sx={{
                      border: "2px solid gray",
                      padding: "20px",
                      borderRadius: "5px",
                      margin: "0px 35px",
                    }}
                  >
                    {`The current tenancy, of ${currentTenancy?.tenants[0].firstName} ${currentTenancy?.tenants[0].firstName} `}
                    <span>
                      {currentTenancy.tenants[1]
                        ? `& ${currentTenancy.tenants[1].firstName} ${currentTenancy.tenants[1].firstName}`
                        : ""}
                    </span>
                    {` was established.`}
                  </div>
                </>
              )}
          </section>
        </div>
      </section>
    </div>
  );
}

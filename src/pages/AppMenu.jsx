import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../helpers/FecthApi";
import { useAppContext } from "../helpers/ContextApi";

const AppMenu = () => {
  const { authUser, selectedInstitution, setSelectedInstitution } = useAppContext();
  const navigate = useNavigate();

  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState("");

  const normalizeInstitutionItem = (item) => item?.institution || item;

  const normalizeInstitutionsResponse = (response) => {
    if (Array.isArray(response)) return response.map(normalizeInstitutionItem);
    if (Array.isArray(response?.data)) {
      return response.data.map(normalizeInstitutionItem);
    }
    return [];
  };

  const getUserInstitutions = () => {
    if (Array.isArray(authUser?.institutions)) {
      return authUser.institutions.map(normalizeInstitutionItem);
    }
    if (authUser?.institution) return [authUser.institution];
    return [];
  };

  const getInstitutions = async () => {
    try {
      setError("");

      if (authUser?.global_role === "Admin") {
        const response = await get("institutions");
        setInstitutions(normalizeInstitutionsResponse(response));
      } else {
        setInstitutions(getUserInstitutions());
      }
    } catch (err) {
      setError("Nao foi possivel carregar as instituicoes.");
      console.error("Error loading institutions:", err);
    }
  };

  const handleSelectInstitution = (institution) => {
    setSelectedInstitution(institution);
    navigate("/selection");
  };

  useEffect(() => {
    getInstitutions();
    // eslint-disable-next-line
  }, [authUser]);

  return (
    <div>
      <h2>Selecione a instituicao</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {institutions.map((institution) => (
          <div key={institution.id}>
            <button
              type="button"
              onClick={() => handleSelectInstitution(institution)}
              style={{
                fontWeight:
                  selectedInstitution?.id === institution.id ? "bold" : "normal",
                marginBottom: "8px",
              }}
            >
              {institution.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppMenu;

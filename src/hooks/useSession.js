// Per decodificare il token che ci arriva dal FE
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAuth } from '../middlewares/ProtectedRoutes';

const useSession = () => {
  //Vogliamo sapere se abbiamo un token nel localStorage
  const session = isAuth();
  // Se la sessione esiste facciamo il decode del token, altrimenti non fare nulla
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();

//Controllo scadenza token (impostato in login BE)
  const checkExpTime = (token) => {
    const convUnixToSec = decodedSession.exp * 1000;
    const expDate = new Date(convUnixToSec)
    console.log(expDate);
    const currentDate = new Date()

//Se la scadenza è minore della data attuale (quindi scaduto)
    if(expDate < currentDate){
//Cancella dal localStorage il token
        localStorage.clear()
    }
  }

  useEffect(() => {
    //Se la sessione non esiste, ritorna alla root principale (Login)
    if (!session) {
      navigate("/", { replace: true }); //replace: true per non far andare indietro l'utente con le frecce del browser e cancella la history
    }
    checkExpTime()
  }, [navigate, session]);

  return decodedSession;
};

export default useSession;

import { Helmet } from "react-helmet";

const ErrorPage = () => (
    <>
        <Helmet>
            <meta property="og:title" content="Stránka nebyla nalezena | SHOPPING LIST"/>
            <title>Stránka nebyla nalezena | SHOPPING LIST</title>
        </Helmet>
        404 : Stránka nebyla nalezena
    </>
);



export default ErrorPage;
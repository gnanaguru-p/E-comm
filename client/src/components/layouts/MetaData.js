import { Helmet } from "react-helmet-async"

export default function MetaData({title}) {
    return (
        <Helmet>
            <title>{`${title} - Guru E-comm`}</title>
        </Helmet>
    )
}
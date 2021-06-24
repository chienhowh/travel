
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
    touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    console.log(props.match);

    return (<h1>旅遊ＩＤ： {props.match.params.touristRouteId}</h1>)
}
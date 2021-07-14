import { Comment, List } from 'antd';
import { tify } from 'chinese-conv';
interface PropsType {
    data: {
        author: string;
        avatar: string;
        content: string;
        createDate: string;
    }[];
}



export const ProductComments: React.FC<PropsType> = ({ data }) => {
    return (<List dataSource={data} renderItem={item => (<li><Comment author={item.author}
        avatar={item.avatar}
        content={tify(item.content)}
        datetime={item.createDate}
    >
    </Comment></li>)

    }>

    </List>)
}
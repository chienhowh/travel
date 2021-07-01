import { Tooltip, Comment, List } from 'antd';

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
        content={item.content}
        datetime={item.createDate}
    >
    </Comment></li>)

    }>

    </List>)
}
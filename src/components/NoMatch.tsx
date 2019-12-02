import React from 'react';
import { Result, Button } from 'antd';

interface props {
    status: any;
}
export default ({ status }: props) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="抱歉，您访问的页面不存在。"
            extra={
                <Button type="primary" href="#/">
                    回到首页
				</Button>
            }
        />
    );
};

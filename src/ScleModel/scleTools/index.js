import React, { useState } from 'react'
import { Drawer, Tabs } from 'antd'
import ScleAttrTree from '../scleAttrTree/ScleAttrTree'

function ScleTools() {

    const [drawerVisible, setdrawerVisible] = useState(true)


    
	return (
		<>
			<Drawer
				title={null}
				closable={false}
				mask={true}
				placement="left"
				width="auto"
				visible={drawerVisible}
				getContainer={false}
				bodyStyle={{ padding: 0 }}
				onClose={() => setdrawerVisible(false)}
				className="cleTreeDrawer"
			>
				<ScleAttrTree
					// ref={(el) => (sclAttrTree = el)}
				></ScleAttrTree>
			</Drawer>
			<div className="scleToolsBar">
				{/* <Tabs
					activeKey={this.state.activeTab}
					tabPosition="bottom"
					animated={false}
					onChange={(activeTab) => this.setState({ activeTab })}
				>
					{this.renderTools()}
				</Tabs> */}
			</div>
		</>
	)
}

export default ScleTools

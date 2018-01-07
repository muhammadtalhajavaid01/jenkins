export const actionBtnStyle = {
	verticalAlign: 'middle',
	marginLeft: 20
};

export const fieldStyle = (padding) => {
	if (padding === 0)
		return { paddingLeft: 10 }
	else if (padding === 1)
		return { paddingLeft: 50 }
	else if (padding === 2)
		return 	{ paddingLeft: 100 }
}

export const addItemStyle = {
	height: '25px'
}

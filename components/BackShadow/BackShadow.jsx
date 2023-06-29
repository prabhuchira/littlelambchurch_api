
function BackShadow(props){
    return (
        <div style={{
            width:"100%",
            height:"100vh",
            position: "absolute",
            top: "0px",
            background: "#0000009c",
            zIndex: "10000",

        }}>{props.children}</div>
    )
}

export default BackShadow;
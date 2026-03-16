export function SampleCodeBlock() {
    return (
        <div className="rounded-md bg-[#282c34] p-4">
            <>
                <pre
                    className="shiki one-dark-pro"
                    // style={{ backgroundColor: "#282c34", color: "#abb2bf" }}
                    tabIndex={0}
                >
                    <code>
                        <span className="line">
                            <span style={{ color: "#C678DD" }}>const</span>
                            <span style={{ color: "#E5C07B" }}> query</span>
                            <span style={{ color: "#56B6C2" }}> =</span>
                            <span style={{ color: "#E5C07B" }}> q</span>
                            <span style={{ color: "#ABB2BF" }}>.</span>
                            <span style={{ color: "#61AFEF" }}>select</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                        </span>
                        {"\n"}
                        <span className="line">
                            <span style={{ color: "#E5C07B" }}>{"  "}q</span>
                            <span style={{ color: "#ABB2BF" }}>.</span>
                            <span style={{ color: "#61AFEF" }}>c</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#98C379" }}>"users.id"</span>
                            <span style={{ color: "#ABB2BF" }}>),</span>
                        </span>
                        {"\n"}
                        <span className="line">
                            <span style={{ color: "#E5C07B" }}>{"  "}q</span>
                            <span style={{ color: "#ABB2BF" }}>.</span>
                            <span style={{ color: "#61AFEF" }}>c</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#98C379" }}>"users.name"</span>
                            <span style={{ color: "#ABB2BF" }}>),</span>
                        </span>
                        {"\n"}
                        <span className="line">
                            <span style={{ color: "#ABB2BF" }}>)</span>
                        </span>
                        {"\n"}
                        <span className="line">
                            <span style={{ color: "#ABB2BF" }}>{"  "}.</span>
                            <span style={{ color: "#61AFEF" }}>from</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#E5C07B" }}>q</span>
                            <span style={{ color: "#ABB2BF" }}>.</span>
                            <span style={{ color: "#61AFEF" }}>t</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#98C379" }}>"users"</span>
                            <span style={{ color: "#ABB2BF" }}>))</span>
                        </span>
                        {"\n"}
                        <span className="line">
                            <span style={{ color: "#ABB2BF" }}>{"  "}.</span>
                            <span style={{ color: "#61AFEF" }}>where</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#E5C07B" }}>q</span>
                            <span style={{ color: "#ABB2BF" }}>.</span>
                            <span style={{ color: "#61AFEF" }}>c</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#98C379" }}>"users.age"</span>
                            <span style={{ color: "#ABB2BF" }}>).</span>
                            <span style={{ color: "#61AFEF" }}>op</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#98C379" }}>"&gt;="</span>
                            <span style={{ color: "#ABB2BF" }}>).</span>
                            <span style={{ color: "#61AFEF" }}>v</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#D19A66" }}>65</span>
                            <span style={{ color: "#ABB2BF" }}>))</span>
                        </span>
                        {"\n"}
                        <span className="line">
                            <span style={{ color: "#ABB2BF" }}>{"  "}.</span>
                            <span style={{ color: "#61AFEF" }}>orderBy</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#E5C07B" }}>q</span>
                            <span style={{ color: "#ABB2BF" }}>.</span>
                            <span style={{ color: "#61AFEF" }}>c</span>
                            <span style={{ color: "#ABB2BF" }}>(</span>
                            <span style={{ color: "#98C379" }}>"users.name"</span>
                            <span style={{ color: "#ABB2BF" }}>));</span>
                        </span>
                    </code>
                </pre>
            </>


        </div>
    )
}
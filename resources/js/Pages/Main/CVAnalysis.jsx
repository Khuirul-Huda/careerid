import React from "react";
import BaseLayout from "./BaseLayout.jsx";

// Assuming you have a BaseLayout component in your project

const CVAnalysis = () => {
    return (
        <BaseLayout>
            <div style={{ padding: '20px' }}>
                <h1>CV Analysis</h1>
                <p>Analyze your CV with AI-powered insights.</p>
                {/* Add your CV analysis components here */}
            </div>
        </BaseLayout>
    );
};

export default CVAnalysis;
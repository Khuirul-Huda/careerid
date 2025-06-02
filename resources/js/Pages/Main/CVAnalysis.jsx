import React from "react";
import BaseLayout from "./BaseLayout.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

// Assuming you have a BaseLayout component in your project

const CVAnalysis = () => {
    const [response, setResponse] = React.useState(null);

    return (
        <BaseLayout>
            <div
                style={{
                    display: "flex",
                    gap: "24px",
                    flexDirection: response ? "row" : "column",
                    alignItems: "stretch",
                    padding: "20px",
                }}
            >
                <Card>
                    <CardContent>
                        <Typography variant="h1" style={{ textAlign: "center" }}>
                            CV Analyzer
                        </Typography>
                        <p>
                            Upload your CV to get AI-powered insights and suggestions for improvement.
                        </p>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    // Simulate an API call
                                    setTimeout(() => {
                                        setResponse(`Analysis of ${file.name} completed successfully!`);
                                    }, 1000);
                                }
                            }}
                        />
                    </CardContent>
                </Card>


                {response && (
                    <div
                        style={{
                            flex: 1,
                            maxWidth: "50%",
                            width: "100%",
                            border: "1px solid #eee",
                            borderRadius: "8px",
                            padding: "24px",
                            background: "#f5f7fa",
                        }}
                    >
                        <h2>Analysis Result</h2>
                        <p>{response}</p>
                        <button onClick={() => setResponse(null)}>Clear</button>
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

export default CVAnalysis;
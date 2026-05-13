import { useState, useEffect } from 'react';

// Loading Page Component
function LoadingPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ fontSize: '18px', color: '#666' }}>Loading posts...</p>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

// Failed Page Component
function FailedPage({ error, onRetry }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: '#ffe6e6',
            padding: '40px',
            borderRadius: '8px'
        }}>
            <div style={{ fontSize: '48px' }}>❌</div>
            <h2 style={{ color: '#d32f2f', marginTop: '10px' }}>Failed to Load Posts</h2>
            <p style={{ color: '#666', textAlign: 'center', maxWidth: '400px' }}>
                {error || 'An error occurred while fetching the posts. Please try again.'}
            </p>
            <button
                onClick={onRetry}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '10px'
                }}
            >
                Retry
            </button>
        </div>
    );
}

export default function Demo() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = () => {
        setLoading(true);
        setError(null);
        
        fetch('https://jsonplaceholder.typicode.com/posts?')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []); // Empty dependency array - runs once on mount

    if (loading) return <LoadingPage />;

    if (error) return <FailedPage error={error} onRetry={fetchPosts} />;

    return (
        <div>
            <h1>Posts from JSONPlaceholder</h1>
            {posts.map(post => (
                <div key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '7px solid #ddd' }}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}
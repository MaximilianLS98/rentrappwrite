export default async function NotFound() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[90vh] p-4">
        <h1 className="text-4xl">404 - Page Not Found</h1>
            <p className="text-lg">Sorry, the page you are looking for does not exist.</p>
        </div>
    );
}
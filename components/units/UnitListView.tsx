// ! type-safe this
export default function UnitListView(units: any) {
    return (
        <div>
            <h1>Unit List View</h1>
            <ul>
                {units.map((unit: any) => {
                    return <li key={unit.id}>{unit.name}</li>;
                })}
            </ul>
            {/* <pre>{JSON.stringify(units, null, 2)}</pre> */}
        </div>
    );
}
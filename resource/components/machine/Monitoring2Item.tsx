export default function Monitoring2Item(props) {
  console.log(props.data);
  return (
    <div>
      <p>{props.data.mid}</p>
      <p>{props.data.execution}</p>
    </div>
  );
}

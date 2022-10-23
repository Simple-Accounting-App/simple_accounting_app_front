// Transaction Form errors

export default function TransactionFormErrors (props) {
  let all_errors = [];
  // Catching GraphQL validations errors
  let gqlErrors = props.graphQLErrors;
  if(gqlErrors) {
    gqlErrors.message.split("\n").map(
      err => all_errors.push(err)
    )
  }
  // Catching Rails validations errors
  let data = props.data;
  if(data) {
    data.createTransaction.errors.map(
      err => all_errors.push(err)
    )
  }

  if (all_errors.length > 0) return (
    <div>
      <h3>The transaction was not saved due to these errors:</h3>
      <ul>
        { 
          all_errors.map(err => 
            <li>{err}</li>
          )
        }
      </ul>
    </div>
  );
}
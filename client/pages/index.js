import Link from 'next/link';

const LandingPage = ({currentUser, tickets}) => {
  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td><Link href='tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
          <a>Details</a>
        </Link>
        </td>
      </tr>
    );
  })
  return (
    <div>
      <h1> Tickets </h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ticketList.length ? ticketList : <h4>No Tickets Found</h4>}
        </tbody>
      </table>
    </div>
  );
  // return <h1> {currentUser ? 'you are sign in'  :  'you are  not sign in '}  </h1>;
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const {data} = await client.get('api/tickets');
  return {tickets : data}
};
export default LandingPage;

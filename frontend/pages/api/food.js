export default function handler(req, res) {
    if (req.method === 'POST') {

        res.status(200).json({ message: 'POST request to /api/food' });
    } else {
        res.status(405).end();
    }
}
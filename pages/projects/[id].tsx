import { useRouter } from 'next/router';
import UnderConstruction from '../../components/UnderConstruction';

export default function Project() {
    const router = useRouter();
    const { id } = router.query;

    return <UnderConstruction />;
}

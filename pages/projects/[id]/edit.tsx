import { useRouter } from 'next/router';
import UnderConstruction from '../../../components/UnderConstruction';

export default function EditProject() {
    const router = useRouter();
    const { id } = router.query;

    return <UnderConstruction />;
}

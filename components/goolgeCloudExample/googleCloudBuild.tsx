import Link from 'next/link';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import styles from './googleCloud.module.css';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '../customCard/customCard';

export default function GoogleCloudBuild() {
	const { bg: themeBg, border: themeBorder, text: themeText } = useRecoilValue(selectThemeSiteState);

	return (
		<>
			<Card bg={themeBg} className={`border ${themeBorder}`}>
				<Card.Header className={`h5 ${themeBorder}`}>Cloud Build</Card.Header>
				<Card.Body className={`px-2 py-1`}>
					<Card.Text>
						Connect Google Cloud Build to GitHub repository with the branch of main. The Dockerfile is used to create an
						image that can be later used in Cloud run to build the website. Need to make sure the Region used is the
						same on Cloud Run.
					</Card.Text>
				</Card.Body>
				<Card.Body className={`px-2 py-1 text-center`}>
					<Card.Img
						alt="Google Cloud Build"
						variant="top"
						className={`border ${themeBorder} ${styles.image} ${styles.imgBuild}`}
						src="/static/images/examples/GoogleCloudBuildSS.jpg"
					/>
				</Card.Body>
				<CustomCard header="Resources">
					<ListGroup>
						<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
							<Link href="https://cloud.google.com/build/docs">Google Cloud - Cloud Build documentation</Link>
						</ListGroup.Item>
						<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
							<Link href="https://github.com/GoogleCloudPlatform/cloud-build-samples">
								Google Cloud - Cloud Build Samples
							</Link>
						</ListGroup.Item>
						<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
							<Link href="https://blog.tericcabrel.com/create-docker-image-nextjs-application/">
								NextJS - Docker Image
							</Link>
						</ListGroup.Item>
						<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
							<Link href="https://nextjs.org/docs/deployment#docker-image">
								NextJS - NextJS.org Docker Image documentation
							</Link>
						</ListGroup.Item>
						<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
							<Link href="https://www.section.io/engineering-education/dockerized-prisma-postgres-api/">
								Prisma - Docker example
							</Link>
						</ListGroup.Item>
						<ListGroup.Item className={`bg-${themeBg} ${themeText} ${themeBorder}`}>
							<Link href="https://www.freecodecamp.org/news/how-to-dockerize-a-flask-app/">
								Python with flask - Docker example
							</Link>
						</ListGroup.Item>
					</ListGroup>
				</CustomCard>
			</Card>
		</>
	);
}

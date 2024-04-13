import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, ListIcon, VStack } from '@chakra-ui/react';
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

interface StudentSignInInfo {
	studentId: string;
	studentName: string;
	hasSignedIn: boolean;
}

const SignInInfo: React.FC = () => {
	const [studentsSignInInfo, setStudentsSignInInfo] = useState<StudentSignInInfo[]>([]);
	
	useEffect(() => {
		// TODO: Replace with actual API call to fetch sign-in info
		const mockSignInInfo: StudentSignInInfo[] = [
			{ studentId: 'S10001', studentName: '张三', hasSignedIn: true },
			{ studentId: 'S10002', studentName: '李四', hasSignedIn: false },
			// More mock data...
		];
		setStudentsSignInInfo(mockSignInInfo);
	}, []);
	
	const signedInStudents = studentsSignInInfo.filter(student => student.hasSignedIn);
	const notSignedInStudents = studentsSignInInfo.filter(student => !student.hasSignedIn);
	
	return (
		<VStack spacing={6} align="stretch" p={5}>
			<Box>
				<Heading size="md" mb={2}>已签到学生</Heading>
				<List spacing={2}>
					{signedInStudents.map(student => (
						<ListItem key={student.studentId}>
							<ListIcon as={CheckCircleIcon} color="green.500" />
							{student.studentName} ({student.studentId})
						</ListItem>
					))}
				</List>
			</Box>
			<Box>
				<Heading size="md" mb={2}>未签到学生</Heading>
				<List spacing={2}>
					{notSignedInStudents.map(student => (
						<ListItem key={student.studentId}>
							<ListIcon as={NotAllowedIcon} color="red.500" />
							{student.studentName} ({student.studentId})
						</ListItem>
					))}
				</List>
			</Box>
		</VStack>
	);
};

export default SignInInfo;

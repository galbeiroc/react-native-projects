import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './nearbyJobCard.style';
import { checkImageURL } from '../../../../utils';
import { DEFAULT_IMAGE } from '../popular/PopularJobCard';

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: checkImageURL(job.employer_logo) ? job.employer_logo : DEFAULT_IMAGE }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.jobName}>{job.job_title}</Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default NearbyJobCard
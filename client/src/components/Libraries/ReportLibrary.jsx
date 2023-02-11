import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import Report from '../Utils/Report';
import lampostAPI from '../../apis/lampost';

const ReportLibrary = (props) => {
  const { auth } = useContext(GlobalContext);
  const onSubmitPress = async () => {
    const payload = {
      libraryId: auth.data._id,
      userId: auth.data._id,
    };
    const result = await lampostAPI.post('reports/library');
  };

  return (
    <Report
      issueHeader='What kind of issue with this library?'
      issueDescription='Please choose a issue option. Your report will be sent only to developer.'
      onSubmitPress={onSubmitPress}
    />
  );
};

export default ReportLibrary;

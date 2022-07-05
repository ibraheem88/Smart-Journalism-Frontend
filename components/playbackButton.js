import * as React from 'react';
import { View ,TouchableHighlight } from 'react-native';
import { Video} from 'expo-av';

class PlaybackButton extends React.Component {
    reset = async () => {
      await this.video.stopAsync();
      await this.video.setPositionAsync(0);
    };
    replay = async () => {
      await this.video.replayAsync();
    };
  
    render() {
      return (
        <View>
          <TouchableHighlight
            onPress={() => {
              this.replay();
            }}>
            <View>
              <Video
                source={this.props.source}
                style={{
                  width: this.props.width || this.props.size || 400,
                  height: this.props.height || this.props.size || 400,
                  alignSelf: 'center',
                  margin: 5,
                }}
                resizeMode="cover"
                shouldPlay={true}
                ref={(c) => (this.video = c)}
                onPlaybackStatusUpdate={(status) => {
                  if (status.didJustFinish) {
                    this.reset();
                  }
                }}
              />
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

  export default PlaybackButton
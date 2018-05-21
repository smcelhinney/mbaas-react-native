import * as React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

class Terms extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  private onNavigatorEvent(event: any) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'closeModal') {
        this.props.navigator.dismissModal();
      }
    }
  }

  public render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>End user license agreement</Text>
        <Text style={styles.paragraph}>
          The Products transacted through the Service are licensed, not sold, to
          You for use only under the terms of this license, unless a Product is
          accompanied by a separate license agreement, in which case the terms
          of that separate license agreement will govern, subject to Your prior
          acceptance of that separate license agreement. University College
          Dublin reserves all rights not expressly granted to You. The Product
          that is subject to this license is the ‘MyBugs’ Application.
        </Text>
        <Text style={styles.paragraph}>
          Scope of License: This license granted to You for the ‘MyBugs’
          Application by University College Dublin is limited to a
          non-transferable license to use the ‘MyBugs’ Application on any iPhone
          or iPod touch that You own or control and as permitted by the Usage
          Rules set forth in Section 9.b. of the App Store Terms and Conditions
          (the “Usage Rules”). This license does not allow You to use the
          ‘MyBugs’ Application on any iPod touch or iPhone that You do not own
          or control, and You may not distribute or make the ‘MyBugs’
          Application available over a network where it could be used by
          multiple devices at the same time. You may not rent, lease, lend,
          sell, redistribute or sublicense the ‘MyBugs’ Application. You may not
          copy (except as expressly permitted by this license and the Usage
          Rules), decompile, reverse engineer, disassemble, attempt to derive
          the source code of, modify, or create derivative works of the ‘MyBugs’
          Application, any updates, or any part thereof (except as and only to
          the extent any foregoing restriction is prohibited by applicable law
          or to the extent as may be permitted by the licensing terms governing
          use of any open sourced components included with the ‘MyBugs’
          Application). Any attempt to do so is a violation of the rights of
          University College Dublin and its licensors. If You breach this
          restriction, You may be subject to prosecution and damages. The terms
          of the license will govern any upgrades provided by University College
          Dublin that replace and/or supplement the original Product, unless
          such upgrade is accompanied by a separate license in which case the
          terms of that license will govern.
        </Text>
        <Text style={styles.paragraph}>
          Consent to Use of Data: You agree that University College Dublin may
          collect and use recorded data and technical data and related
          information, including but not limited to technical information about
          Your device, system and application software, and peripherals, that is
          gathered periodically to facilitate the provision of software updates,
          product support and other services to You (if any) related to the
          ‘MyBugs’ Application. University College Dublin may use this
          information, as long as it is in a form that does not personally
          identify You, to improve its products or to provide services or
          technologies to You. Recorded data will be used for epidemiological
          analysis.
        </Text>
        <Text style={styles.paragraph}>
          Termination. The license is effective until terminated by You or
          University College Dublin. Your rights under this license will
          terminate automatically without notice from University College Dublin
          if You fail to comply with any term(s) of this license. Upon
          termination of the license, You shall cease all use of the ‘MyBugs’
          Application, and destroy all copies, full or partial, of the ‘MyBugs’
          Application.
        </Text>
        <Text style={styles.paragraph}>
          Services; Third Party Materials. The ‘MyBugs’ Application may enable
          access to Application Provider’s and third party services and web
          sites (collectively and individually, "Services"). Use of the Services
          may require Internet access and that You accept additional terms of
          service. You understand that by using any of the Services, You may
          encounter content that may be deemed offensive, indecent, or
          objectionable, which content may or may not be identified as having
          explicit language, and that the results of any search or entering of a
          particular URL may automatically and unintentionally generate links or
          references to objectionable material. Nevertheless, You agree to use
          the Services at Your sole risk and that University College Dublin
          shall not have any liability to You for content that may be found to
          be offensive, indecent, or objectionable. Certain Services may
          display, include or make available content, data, information,
          applications or materials from third parties (“Third Party Materials”)
          or provide links to certain third party web sites. By using the
          Services, You acknowledge and agree that University College Dublin is
          not responsible for examining or evaluating the content, accuracy,
          completeness, timeliness, validity, copyright compliance, legality,
          decency, quality or any other aspect of such Third Party Materials or
          web sites. University College Dublin does not warrant or endorse and
          does not assume and will not have any liability or responsibility to
          You or any other person for any third-party Services, Third Party
          Materials or web sites, or for any other materials, products, or
          services of third parties. Third Party Materials and links to other
          web sites are provided solely as a convenience to You. Financial
          information displayed by any Services is for general informational
          purposes only and is not intended to be relied upon as investment
          advice. Before executing any securities transaction based upon
          information obtained through the Services, You should consult with a
          financial professional. Location data provided by any Services is for
          basic navigational purposes only and is not intended to be relied upon
          in situations where precise location information is needed or where
          erroneous, inaccurate or incomplete location data may lead to death,
          personal injury, property or environmental damage. Neither University
          College Dublin, nor any of its content providers, guarantees the
          availability, accuracy, completeness, reliability, or timeliness of
          stock information or location data displayed by any Services. You
          agree that any Services contain proprietary content, information and
          material that is protected by applicable intellectual property and
          other laws, including but not limited to copyright, and that You will
          not use such proprietary content, information or materials in any way
          whatsoever except for permitted use of the Services. No portion of the
          Services may be reproduced in any form or by any means. You agree not
          to modify, rent, lease, loan, sell, distribute, or create derivative
          works based on the Services, in any manner, and You shall not exploit
          the Services in any unauthorized way whatsoever, including but not
          limited to, by trespass or burdening network capacity. You further
          agree not to use the Services in any manner to harass, abuse, stalk,
          threaten, defame or otherwise infringe or violate the rights of any
          other party, and that University College Dublin is not in any way
          responsible for any such use by You, nor for any harassing,
          threatening, defamatory, offensive or illegal messages or
          transmissions that You may receive as a result of using any of the
          Services. In addition, third party Services and Third Party Materials
          that may be accessed from, displayed on or linked to from the iPhone
          or iPod touch are not available in all languages or in all countries.
          University College Dublin makes no representation that such Services
          and Materials are appropriate or available for use in any particular
          location. To the extent You choose to access such Services or
          Materials, You do so at Your own initiative and are responsible for
          compliance with any applicable laws, including but not limited to
          applicable local laws. University College Dublin, and its licensors,
          reserve the right to change, suspend, remove, or disable access to any
          Services at any time without notice. In no event will University
          College Dublin be liable for the removal of or disabling of access to
          any such Services. University College Dublin may also impose limits on
          the use of or access to certain Services, in any case and without
          notice or liability.
        </Text>
        <Text style={styles.paragraph}>
          NO WARRANTY: YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT USE OF THE
          ‘MYBUGS’ APPLICATION IS AT YOUR SOLE RISK AND THAT THE ENTIRE RISK AS
          TO SATISFACTORY QUALITY, PERFORMANCE, ACCURACY AND EFFORT IS WITH YOU.
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE ‘MYBUGS’
          APPLICATION AND ANY SERVICES PERFORMED OR PROVIDED BY THE ‘MYBUGS’
          APPLICATION ("SERVICES") ARE PROVIDED "AS IS" AND “AS AVAILABLE”, WITH
          ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND, AND UNIVERSITY COLLEGE
          DUBLIN HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH RESPECT TO
          THE ‘MYBUGS’ APPLICATION AND ANY SERVICES, EITHER EXPRESS, IMPLIED OR
          STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
          AND/OR CONDITIONS OF MERCHANTABILITY, OF SATISFACTORY QUALITY, OF
          FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY, OF QUIET ENJOYMENT, AND
          NON-INFRINGEMENT OF THIRD PARTY RIGHTS. UNIVERSITY COLLEGE DUBLIN DOES
          NOT WARRANT AGAINST INTERFERENCE WITH YOUR ENJOYMENT OF THE ‘MYBUGS’
          APPLICATION, THAT THE FUNCTIONS CONTAINED IN, OR SERVICES PERFORMED OR
          PROVIDED BY, THE ‘MYBUGS’ APPLICATION WILL MEET YOUR REQUIREMENTS,
          THAT THE OPERATION OF THE ‘MYBUGS’ APPLICATION OR SERVICES WILL BE
          UNINTERRUPTED OR ERROR-FREE, OR THAT DEFECTS IN THE ‘MYBUGS’
          APPLICATION OR SERVICES WILL BE CORRECTED. NO ORAL OR WRITTEN
          INFORMATION OR ADVICE GIVEN BY UNIVERSITY COLLEGE DUBLIN OR ITS
          AUTHORIZED REPRESENTATIVE SHALL CREATE A WARRANTY. SHOULD THE ‘MYBUGS’
          APPLICATION OR SERVICES PROVE DEFECTIVE, YOU ASSUME THE ENTIRE COST OF
          ALL NECESSARY SERVICING, REPAIR OR CORRECTION. SOME JURISDICTIONS DO
          NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES OR LIMITATIONS ON
          APPLICABLE STATUTORY RIGHTS OF A CONSUMER, SO THE ABOVE EXCLUSION AND
          LIMITATIONS MAY NOT APPLY TO YOU.
        </Text>
        <Text style={styles.paragraph}>
          Limitation of Liability. TO THE EXTENT NOT PROHIBITED BY LAW, IN NO
          EVENT SHALL UNIVERSITY COLLEGE DUBLIN BE LIABLE FOR PERSONAL INJURY,
          OR ANY INCIDENTAL, SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES
          WHATSOEVER, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF
          PROFITS, LOSS OF DATA, BUSINESS INTERRUPTION OR ANY OTHER COMMERCIAL
          DAMAGES OR LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OR INABILITY
          TO USE THE ‘MYBUGS’ APPLICATION, HOWEVER CAUSED, REGARDLESS OF THE
          THEORY OF LIABILITY (CONTRACT, TORT OR OTHERWISE) AND EVEN IF
          UNIVERSITY COLLEGE DUBLIN HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY
          FOR PERSONAL INJURY, OR OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO
          THIS LIMITATION MAY NOT APPLY TO YOU. In no event shall University
          College Dublin’s total liability to you for all damages (other than as
          may be required by applicable law in cases involving personal injury)
          exceed the amount of fifty dollars ($50.00). The foregoing limitations
          will apply even if the above stated remedy fails of its essential
          purpose.
        </Text>
        <Text style={styles.paragraph}>
          You may not use or otherwise export or re-export the ‘MyBugs’
          Application except as authorized by Irish law and the laws of the
          jurisdiction in which the ‘MyBugs’ Application was obtained.
        </Text>
        <Text style={styles.paragraph}>
          The ‘MyBugs’ Application and related documentation are "Commercial
          Items", as that term is defined at 48 C.F.R. §2.101, consisting of
          "Commercial Computer Software" and "Commercial Computer Software
          Documentation", as such terms are used in 48 C.F.R. §12.212 or 48
          C.F.R. §227.7202, as applicable. Consistent with 48 C.F.R. §12.212 or
          48 C.F.R. §227.7202-1 through 227.7202-4, as applicable, the
          Commercial Computer Software and Commercial Computer Software
          Documentation are being licensed to U.S. Government end users (a) only
          as Commercial Items and (b) with only those rights as are granted to
          all other end users pursuant to the terms and conditions herein.
          Unpublished-rights reserved under the copyright laws of the Eurpeoan
          Union.
        </Text>
        <Text style={styles.paragraph}>
          The laws of Ireland, excluding its conflicts of law rules, govern this
          license and your use of the ‘MyBugs’ Application. Your use of the
          ‘Mybugs’ Application may also be subject to other local, state,
          national, or international laws.
        </Text>
        <Text style={styles.paragraph}>
          Clinicians cannot be held responsible for making a clinical decision
          based on the information provided.
        </Text>
      </ScrollView>
    );
  }
}

export default Terms;

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  paragraph: {
    fontSize: 13,
    paddingBottom: 10
  }
});

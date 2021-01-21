package  xyz.fowee.utils;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;
import ch.ethz.ssh2.StreamGobbler;
public class DevOpsUtils {

	public static void main(String[] args) {
		String hostname = "192.168.229.92";
		String username = "root";
		String password = "liuxinyan99";
		DevOpsUtils  dou = new DevOpsUtils();
		try {
			Connection conn = new Connection(hostname);
			conn.connect();
			boolean isAuthenticated = conn.authenticateWithPassword(username, password);
			if (isAuthenticated == false)
				throw new IOException("连接服务器失败");

			Session sess1 = conn.openSession();
			sess1.execCommand("free -t");

			Session sess2 = conn.openSession();
			sess2.execCommand("cat /proc/stat");


			InputStream stdout1 = new StreamGobbler(sess1.getStdout());
			BufferedReader br = new BufferedReader(new InputStreamReader(stdout1));
			LogUtils.inof("内存使用情况", dou);
			while (true) {
				String line = br.readLine();
				if (line == null)
					break;
				LogUtils.inof(line,dou);
			}
			sess1.close();
			stdout1 = new StreamGobbler(sess2.getStdout());
			br = new BufferedReader(new InputStreamReader(stdout1));
			LogUtils.inof("cpu使用率情况", dou);
			while (true) {
				String line = br.readLine();
				if (line == null)
					break;
				LogUtils.inof(line,dou);
			}
			sess2.close();
			
			
			conn.close();

		} catch (IOException e) {
			//e.printStackTrace(System.err);
			System.exit(2);
		}
	}
}
